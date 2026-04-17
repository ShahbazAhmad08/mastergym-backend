const express = require("express");
const router = express.Router();
const {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
  renewMember,
} = require("../controllers/memberController");

router.route("/").get(getMembers).post(createMember);
router.route("/:id").get(getMember).put(updateMember).delete(deleteMember);
router.route("/:id/renew").put(renewMember);

module.exports = router;
