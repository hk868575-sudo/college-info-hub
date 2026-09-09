const express = require("express");

const {
    createNotice,
    getNotices,
    getNoticeById,
    updateNotice,
    deleteNotice,
    archiveNotice,
    restoreNotice
} = require("../controllers/noticeController");

const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");

const router = express.Router();


// Public routes
router.get("/", getNotices);

router.get("/:id", getNoticeById);


// Protected admin routes
router.post(
    "/",
    protect,
    upload.single("attachment"),
    createNotice
);

router.put("/:id", protect, updateNotice);

router.put("/:id/archive", protect, archiveNotice);

router.put("/:id/restore", protect, restoreNotice);

router.delete("/:id", protect, deleteNotice);


module.exports = router;