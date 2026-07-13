export const checkHealth = (req, res) => {
  res.status(200).json({
    status: "MindVault AI backend running"
  });
};
