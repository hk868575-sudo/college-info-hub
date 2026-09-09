const Notice = require("../models/Notice");

// Create a new notice
const createNotice = async (req, res) => {
    try {
        const noticeData = {
            ...req.body
        };

        // Add attachment information if a file was uploaded
        if (req.file) {

            const originalName =
                Buffer.from(req.file.originalname, "latin1")
                    .toString("utf8");
        
            noticeData.attachment = {
                name: originalName,
                url: `/uploads/${req.file.filename}`,
                type: req.file.mimetype
            };
        }

        const notice = await Notice.create(noticeData);

        res.status(201).json({
            message: "Notice created successfully",
            notice: notice
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create notice",
            error: error.message
        });
    }
};


// Get all notices with search, category filter and expiry filter
const getNotices = async (req, res) => {
    try {
        const { search, category, includeExpired, includeArchived } = req.query;

        let filter = {};

        // Show only active notices by default
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        filter.$and = [];
        // Hide archived notices by default
        if (includeArchived !== "true") {
        filter.$and.push({
        $or: [
            { isArchived: false },
            { isArchived: { $exists: false } }
            ]
        });
}

    if (includeExpired !== "true") {
        filter.$and.push({
        $or: [
            { expiryDate: { $exists: false } },
            { expiryDate: null },
            { expiryDate: { $gte: today } }
        ]
    });
}

        // Search by title or description
        if (search) {
            filter.$and.push({
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } }
            ]
            });
        }

        // Filter by category
        if (category) {
            filter.category = category;
        }

        const notices = await Notice.find(filter).sort({
            publishDate: -1
        });

        res.status(200).json(notices);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch notices",
            error: error.message
        });
    }
};


// Get a single notice
const getNoticeById = async (req, res) => {
    try {
        const notice = await Notice.findById(req.params.id);

        if (!notice) {
            return res.status(404).json({
                message: "Notice not found"
            });
        }

        res.status(200).json(notice);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch notice",
            error: error.message
        });
    }
};


// Update a notice
const updateNotice = async (req, res) => {
    try {
        const updatedNotice = await Notice.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedNotice) {
            return res.status(404).json({
                message: "Notice not found"
            });
        }

        res.status(200).json({
            message: "Notice updated successfully",
            notice: updatedNotice
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update notice",
            error: error.message
        });
    }
};

// Archive a notice
const archiveNotice = async (req, res) => {
    try {
        const archivedNotice = await Notice.findByIdAndUpdate(
            req.params.id,
            {
                isArchived: true
            },
            {
                new: true
            }
        );

        if (!archivedNotice) {
            return res.status(404).json({
                message: "Notice not found"
            });
        }

        res.status(200).json({
            message: "Notice archived successfully",
            notice: archivedNotice
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to archive notice",
            error: error.message
        });
    }
};

// Restore an archived notice
const restoreNotice = async (req, res) => {
    try {
        const restoredNotice = await Notice.findByIdAndUpdate(
            req.params.id,
            {
                isArchived: false
            },
            {
                new: true
            }
        );

        if (!restoredNotice) {
            return res.status(404).json({
                message: "Notice not found"
            });
        }

        res.status(200).json({
            message: "Notice restored successfully",
            notice: restoredNotice
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to restore notice",
            error: error.message
        });
    }
};

// Delete a notice
const deleteNotice = async (req, res) => {
    try {
        const deletedNotice = await Notice.findByIdAndDelete(
            req.params.id
        );

        if (!deletedNotice) {
            return res.status(404).json({
                message: "Notice not found"
            });
        }

        res.status(200).json({
            message: "Notice deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete notice",
            error: error.message
        });
    }
};


module.exports = {
    createNotice,
    getNotices,
    getNoticeById,
    updateNotice,
    deleteNotice,
    archiveNotice,
    restoreNotice
};