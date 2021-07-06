// [GET] sample
exports.sample = async (req, res) => {
  await new Promise((res) => setTimeout(res, 10));
  return res.status(200).json({ resultCode: 0 });
};
