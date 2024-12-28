import { useState } from "react";
import { Modal, TextField, Box, CircularProgress, Typography } from "@mui/material";
import { useInquiryServices } from "../../../services/inquiry-service";
import SecondaryButton from "../../button/secondary-button";
import PrimaryButton from "../../button/primary-button";
import Loader from "../../loader/loader";
import Table from "../../ui/table/table";
import { TbXboxXFilled } from "react-icons/tb";

type InquiryProps = {
  _id: string;
  title: string;
  email: string;
  description: string;
};

interface ResponseMessage {
  responseMessage: string;
  email: string;
}

const Inquiries = () => {
  const { data, isLoading, error, onSubmit } = useInquiryServices();
  const [open, setOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryProps | null>(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [respondedInquiries, setRespondedInquiries] = useState<Set<string>>(new Set());

  const handleOpen = (inquiry: InquiryProps) => {
    setSelectedInquiry(inquiry);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedInquiry(null);
    setResponseMessage("");
    setIsSubmitting(false);
  };

  const handleSendResponse = async (data: ResponseMessage) => {
    if (selectedInquiry) {
      setIsSubmitting(true);
      try {
        await onSubmit({
          ...data,
          email: selectedInquiry.email,
          id: selectedInquiry._id,
        });
        setRespondedInquiries((prev) => new Set(prev.add(selectedInquiry._id))); // Mark as responded
        handleClose(); // Close modal after successful response
      } catch (error) {
        console.error("Error sending response:", error); // Handle error
      } finally {
        setIsSubmitting(false); // Reset loader state
      }
    }
  };

  const headings = ["Title", "Email", "Description", "Response"];

  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      {isLoading && <Loader />}
      {!isLoading && data?.length === 0 && <p>No inquiries found.</p>}

      <Table headings={headings}>
        {data?.map((item) => (
          <tr key={item._id}>
            <td className="p-3">{item.title}</td>
            <td className="p-3">{item.email}</td>
            <td className="p-3">{item.description}</td>
            <td>
              <SecondaryButton
                onClick={() => handleOpen(item)}
                disabled={respondedInquiries.has(item._id)} // Disable button if inquiry has been responded
              >
                Respond
              </SecondaryButton>
            </td>
          </tr>
        ))}
      </Table>

      {/* Modal for sending response */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            p: 3,
            borderRadius: 2,
            width: "500px",
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div onClick={handleClose}>
            <TbXboxXFilled className="absolute right-5 top-4 text-3xl cursor-pointer" />
          </div>
          <div className="flex flex-col gap-2 p-4">
            <Typography variant="h6">Title: {selectedInquiry?.title}</Typography>
            <Typography variant="h6">
              Send Response to: <span className="underline cursor-pointer">{selectedInquiry?.email}</span>
            </Typography>
          </div>

          {/* Show Loader while sending */}
          {isSubmitting ? (
            <>
              <CircularProgress size={24} />
              <Typography variant="body2" sx={{ mt: 2 }}>
                Sending...
              </Typography>
            </>
          ) : (
            <>
              <TextField
                label="Response Message"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={responseMessage}
                onChange={(e) => setResponseMessage(e.target.value)}
              />
              <div className="flex flex-row gap-4 p-4">
                <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
                <PrimaryButton
                  onClick={() => handleSendResponse({ responseMessage })}
                  disabled={responseMessage.trim() === ""}
                >
                  Send Response
                </PrimaryButton>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Inquiries;
