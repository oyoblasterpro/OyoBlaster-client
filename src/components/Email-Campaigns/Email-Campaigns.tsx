import { CiFilter, CiSearch } from "react-icons/ci";
import { FiChevronDown, FiEdit2 } from "react-icons/fi";
import { RiDraftLine, RiFilter3Line } from "react-icons/ri";
import { Tooltip } from "react-tooltip";

const campaigns = [
  {
    id: 1,
    name: "gdhgdhfjj",
    image: "/path/to/image1.jpg",
    status: "DRAFT",
    edited: "2025-06-05 12:22:22",
    group: null,
  },
  {
    id: 2,
    name: "jkhjhj",
    image: "/path/to/image2.jpg",
    status: "DRAFT",
    edited: "2025-06-05 01:00:37",
    group: "Test group (d...)",
  },
  {
    id: 3,
    name: "bdsfgbfdg",
    image: "/path/to/image3.jpg",
    status: "DRAFT",
    edited: "2025-06-04 00:42:50",
    group: null,
  },
];

const EmailCampaigns = () => {
  return (
    <div className="p-4 bg-white rounded shadow">
      {/* Search and Actions */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Find campaign by name"
            className="border p-2 rounded w-64"
          />
          <CiSearch className="text-xl" />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 border px-4 py-2 rounded">
            <CiFilter />
            Filter
          </button>
          <button className="border flex items-center gap-1 px-4 py-2 rounded">
            <RiFilter3Line />
            Sort
          </button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded">
            New campaign
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm">
        <thead className="text-left border-b">
          <tr>
            <th className="py-2">Campaign</th>
            <th>Groups</th>
            <th>Status</th>
            <th>{""}</th>
            <th>{""}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign.id} className="border-b">
              {/* Campaign */}
              <td className="flex items-center gap-4 py-4">
                <img
                  src={campaign.image}
                  alt="Campaign"
                  className="w-12 h-16 object-cover rounded"
                />
                <div>
                  <div className="font-semibold">{campaign.name}</div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <RiDraftLine className="text-lg text-orange-500" />
                    <span className="bg-gray-200 px-2 py-1 rounded text-gray-700">
                      {campaign.status}
                    </span>
                    <span>Edited {campaign.edited}</span>
                  </div>
                </div>
              </td>

              {/* Groups */}
              <td>
                {campaign.group ? (
                  <span className="bg-gray-200 text-xs px-2 py-1 rounded">
                    {campaign.group}
                  </span>
                ) : (
                  "-"
                )}
              </td>

              {/* Stats */}
              <td>
                <span className="flex-col flex">
                  - <span>delivered</span>
                </span>
              </td>
              <td>
                <span className="flex-col flex">
                  -<span>Open</span>
                </span>
              </td>
              <td>
                <span className="flex-col flex">
                  -<span>Open</span>
                </span>
              </td>

              {/* Actions */}
              <td className="flex items-center gap-2 py-4">
                <span
                  data-tooltip-id={`tooltip-edit-${campaign.id}`}
                  data-tooltip-content="Edit"
                >
                  <FiEdit2 />
                </span>
                <Tooltip id={`tooltip-edit-${campaign.id}`} place="top" />

                <span>
                  {" "}
                  <FiChevronDown />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <div className="flex items-center gap-2">
          <label htmlFor="view">View</label>
          <select id="view" className="border rounded px-2 py-1">
            <option>5</option>
            <option>10</option>
            <option>20</option>
          </select>
        </div>
        <div>1 - 3 of 3</div>
      </div>
    </div>
  );
};

export default EmailCampaigns;
