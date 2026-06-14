import { ReportModel } from "../models/ReportModel.js";

export const createReport =
  async (req, res) => {
    try {
      const report =
        await ReportModel.create({
          ...req.body,
          reportedBy:
            req.userId
        });

      res.status(201).json(
        report
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

export const getReports =
  async (req, res) => {
    try {
      const reports =
        await ReportModel.find()
          .populate(
            "reportedBy",
            "username"
          )
          .populate(
            "productId"
          );

      res.json(reports);
    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

export const updateReportStatus =
  async (req, res) => {
    try {
      const report =
        await ReportModel.findByIdAndUpdate(
          req.params.id,
          {
            status:
              req.body.status
          },
          { new: true }
        );

      res.json(report);
    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };