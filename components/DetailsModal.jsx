import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DetailsModal = ({ data }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#E7E7E7] rounded-md mb-2 py-4 w-full text-black hover:text-white">
          View more details
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-[90vw] sm:max-w-[550px] text-sm text-black"
        style={{ backgroundColor: "white" }}
      >
        <DialogHeader className={`flex justify-center items-center py-4 pt-8`}>
          <DialogTitle>User&#39;s Detail</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto px-4 mb-3">
          <div className="shadow-xl">
            <div className="flex flex-row border-b border-gray-300">
              <div className="w-full md:w-1/2 p-3 bg-[#38B6FF] text-white">
                Name
              </div>
              <div className="w-full md:w-1/2 p-3 text-black">{data?.name}</div>
            </div>
            <div className="flex flex-row border-b border-gray-300">
              <div className="w-full md:w-1/2 p-3 bg-[#38B6FF] text-white">
                User Types
              </div>
              <div className="w-full md:w-1/2 p-3 ">{data?.userTypes}</div>
            </div>
            <div className="flex flex-row border-b border-gray-300">
              <div className="w-full md:w-1/2 p-3 bg-[#38B6FF] text-white">
                Blu Points
              </div>
              <div className="w-full md:w-1/2 p-3">{data?.bluPoints}</div>
            </div>
            <div className="flex flex-row border-b border-gray-300">
              <div className="w-full md:w-1/2 p-3 bg-[#38B6FF] text-white">
                Email
              </div>
              <div className="w-full md:w-1/2 p-3">{data?.email}</div>
            </div>
            <div className="flex flex-row border-b border-gray-300">
              <div className="w-full md:w-1/2 p-3 bg-[#38B6FF] text-white">
                Rewards
              </div>
              <div className="w-full md:w-1/2 p-3">{data?.rewards}</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
