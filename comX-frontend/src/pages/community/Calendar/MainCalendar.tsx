import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { DateTime } from "luxon";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDebugger } from "@/hooks/useDebugger";

const backend_url = import.meta.env.VITE_BACKEND_URL;
interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
}

const colorPalette = [
  "bg-red-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-pink-400",
];

const randomColor = () => {
  return colorPalette[Math.round(Math.random() * 100) % 6];
};

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MainCalendar({
  currentDate,
}: {
  currentDate: DateTime;
}) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  const { ID } = useParams();

  const { mutateAsync: getCalendarTasks } = useMutation({
    mutationFn: async (communityId: number) => {
      const response = await axios.post(
        `${backend_url}/calendar/get-calendar-task`,
        { communityId },
        { withCredentials: true }
      );
      return response.data;
    },
    onSuccess({ data }) {
      setEvents(data);
    },
    onError(error) {
      console.log(error);
    },
  });

  useDebugger(events);

  const { mutateAsync: setCalendarTask } = useMutation({
    mutationFn: async (details: {
      communityId: number;
      startTime: Date;
      endTime: Date;
      title: string;
      description: string;
    }) => {
      const response = await axios.post(
        `${backend_url}/calendar/set-calendar-task`,
        details,
        { withCredentials: true }
      );
      return response.data;
    },
    onSuccess(data) {
      getCalendarTasks(parseInt(ID!, 10));
      console.log(data);
    },
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    getCalendarTasks(parseInt(ID!, 10));
  }, []);

  const handleEventSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setCalendarTask({
      communityId: parseInt(ID!, 10),
      startTime: new Date(formData.get("start") as string),
      endTime: new Date(formData.get("end") as string),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
    });

    setShowModal(false);
    setSelectedEvent(null);
  };

  const handleEventDelete = () => {
    if (selectedEvent) {
      setEvents(events.filter((e) => e.id !== selectedEvent.id));
      setShowModal(false);
      setSelectedEvent(null);
    }
  };

  const getDaysInMonth = (year: number, month: number) => {
    const firstDay = DateTime.local(year, month, 1);
    const lastDay = firstDay.endOf("month");
    const days = [];

    for (let i = 1; i <= lastDay.day; i++) {
      days.push(DateTime.local(year, month, i));
    }

    return days;
  };

  const renderCalendar = () => {
    const days = getDaysInMonth(currentDate.year, currentDate.month);
    const firstDayOfMonth = days[0].weekday;
    const paddingDays = firstDayOfMonth === 7 ? 0 : firstDayOfMonth;

    return (
      <div className="grid grid-cols-7 gap-1">
        {weekdays.map((day) => (
          <div key={day} className="text-center font-bold py-2">
            {day}
          </div>
        ))}
        {Array(paddingDays)
          .fill(null)
          .map((_, index) => (
            <div key={`padding-${index}`} className="p-2"></div>
          ))}
        {days.map((day) => {
          const dayEvents = events.filter((event) => {
            const start = DateTime.fromJSDate(new Date(event.startTime));
            const end = DateTime.fromJSDate(new Date(event.endTime));

            return day >= start && day <= end;
          });
          return (
            <motion.div
              key={day.toISO()}
              className="p-2 border border-gray-200 rounded-lg h-40 w-48"
              whileHover={{ scale: 1.05 }}
            >
              <div
                className={`text-center ${
                  day.hasSame(DateTime.now(), "day")
                    ? "font-bold text-blue-500"
                    : ""
                }`}
              >
                {day.day}
              </div>
              {dayEvents.map((event) => (
                <motion.div
                  key={event.id}
                  className={`${randomColor()} text-white text-xs p-1 mt-1 rounded-md cursor-pointer`}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    setSelectedEvent(event);
                    setShowModal(true);
                  }}
                >
                  {event.title}
                </motion.div>
              ))}
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen text-black">
      <main className="flex-grow p-4 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderCalendar()}
        </motion.div>
      </main>
      ]
      <motion.button
        className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowModal(true)}
      >
        <Plus size={24} />
      </motion.button>
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-lg shadow-xl w-96 relative"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedEvent(null);
                }}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-4">
                {selectedEvent ? "Edit Event" : "Add Event"}
              </h2>
              <form
                onSubmit={(e) => {
                  handleEventSave(e);
                }}
                className="flex flex-col gap-4"
              >
                <Input
                  type="text"
                  name="title"
                  placeholder="Event Title"
                  defaultValue={selectedEvent?.title}
                  className="w-full p-2 border rounded bg-white border-gray-300"
                  required
                />
                <Textarea
                  name="description"
                  defaultValue={selectedEvent?.description}
                  placeholder="Event Description"
                  className="w-full p-2 border rounded bg-white border-gray-300"
                  required
                />
                <Input
                  type="datetime-local"
                  name="start"
                  defaultValue={
                    selectedEvent
                      ? DateTime.fromJSDate(
                          new Date(selectedEvent.startTime)
                        ).toFormat("yyyy-MM-dd'T'HH:mm")
                      : ""
                  }
                  className="w-full p-2 border rounded bg-white border-gray-300"
                  required
                />
                <Input
                  type="datetime-local"
                  name="end"
                  defaultValue={
                    selectedEvent
                      ? DateTime.fromJSDate(
                          new Date(selectedEvent.endTime)
                        ).toFormat("yyyy-MM-dd'T'HH:mm")
                      : ""
                  }
                  className="w-full p-2 border rounded bg-white border-gray-300"
                  required
                />
                <div>
                  {/* colorPalette.map((),()=>{
                    <button className="rounded-full bg-red-400 h-6 w-6"></button>
                  }) */}
                  
                  <button></button>
                </div>
                <div className="flex justify-between">
                  <motion.button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Save
                  </motion.button>
                  {selectedEvent && (
                    <motion.button
                      type="button"
                      onClick={handleEventDelete}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Delete
                    </motion.button>
                  )}
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
