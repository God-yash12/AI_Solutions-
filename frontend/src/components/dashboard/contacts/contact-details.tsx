import { useContactServices } from "../../../services/contact-service";
import Table from "../../ui/table/table";
import Loader from "../../loader/loader";

const ContactDetailsTable = () => {
  const { data, isLoading, error } = useContactServices();

  const headings = ["UserName", "Email", "Phone", "Company", "Country", "Job Title", "Job Details", "Submitted On"];

  if (error) {
    return <div>Error loading contacts: {error?.message}</div>;
  }

  const contactsList = Array.isArray(data?.data) ? data.data : [];

  return (
    <div>
      {isLoading && <Loader />}
      <Table headings={headings}>
        {contactsList.map((contact) => (
          <tr key={contact._id} className="border-b hover:bg-gray-100">
            <td className="px-4 py-2">{contact.name}</td>
            <td className="px-4 py-2">{contact.email}</td>
            <td className="px-4 py-2">{contact.phone}</td>
            <td className="px-4 py-2">{contact.company}</td>
            <td className="px-4 py-2">{contact.country?.label || contact.country}</td>
            <td className="px-4 py-2">{contact.jobTitle}</td>
            <td className="px-4 py-2">{contact.jobDetails}</td>
            <td className="px-4 py-2">{new Date(contact.submittedDate).toLocaleDateString()}</td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default ContactDetailsTable;
