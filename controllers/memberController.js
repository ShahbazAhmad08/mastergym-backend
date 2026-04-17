const Member = require("../models/Member");

exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find().populate("assignedTrainer", "name");
    res.status(200).json({
      success: true,
      count: members.length,
      members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id).populate(
      "assignedTrainer",
      "name",
    );

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.status(200).json({
      success: true,
      member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createMember = async (req, res) => {
  try {
    const { name, email, phone, startDate, membershipPlan } = req.body;

    const today = new Date();
    const expiryDate = new Date(today);

    if (membershipPlan === "Basic") {
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    } else if (membershipPlan === "Premium") {
      expiryDate.setMonth(expiryDate.getMonth() + 3);
    } else if (membershipPlan === "Elite") {
      expiryDate.setMonth(expiryDate.getMonth() + 6);
    }

    const member = await Member.create({
      name,
      email,
      phone,
      startDate,
      membershipPlan,
      expiryDate,
      status: "Active",
    });

    res.status(201).json({
      success: true,
      member,
    });
  } catch (error) {
    // console.error("Error creating member:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.status(200).json({
      success: true,
      member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Member deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.renewMember = async (req, res) => {
  try {
    const { startDate } = req.body;

    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    const expiryDate = new Date(startDate);

    if (member.membershipPlan === "Basic") {
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    } else if (member.membershipPlan === "Premium") {
      expiryDate.setMonth(expiryDate.getMonth() + 3);
    } else if (member.membershipPlan === "Elite") {
      expiryDate.setMonth(expiryDate.getMonth() + 6);
    }

    member.startDate = startDate;
    member.expiryDate = expiryDate;
    member.status = "Active";

    await member.save();

    res.status(200).json({
      success: true,
      member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
