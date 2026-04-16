import { Octokit } from "@octokit/rest";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { filename, content } = req.body;

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });

    const path = `images/${filename}`;

    let sha;
    try {
      const existing = await octokit.repos.getContent({
        owner: "YOUR_USERNAME",
        repo: "YOUR_REPO",
        path
      });
      sha = existing.data.sha;
    } catch {}

    await octokit.repos.createOrUpdateFileContents({
      owner: "YOUR_USERNAME",
      repo: "YOUR_REPO",
      path,
      message: `Update ${filename}`,
      content,
      sha
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}