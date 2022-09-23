async function sendMsg(req, res) {
  try {
    const results = await res.locals.store.sendRequest(req.body);
    if (results) {
      res.status(200).json({ msg: 'request was sent' });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: 'request not sent' });
  }
}

module.exports = sendMsg;
