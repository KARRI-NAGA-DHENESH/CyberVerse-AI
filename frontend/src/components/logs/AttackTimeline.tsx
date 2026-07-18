type TimelineEvent = {
  time: string;
  title: string;
  color: string;
};

type Props = {
  events: TimelineEvent[];
};

function AttackTimeline({ events }: Props) {
  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-[#07111F] p-6">

      <h2 className="mb-6 text-2xl font-bold text-cyan-400">
        🕒 Attack Timeline
      </h2>

      <div className="space-y-6">

        {events.map((event, index) => (

          <div
            key={index}
            className="flex items-start gap-4"
          >

            <div
              className={`mt-2 h-4 w-4 rounded-full ${event.color}`}
            />

            <div className="flex-1">

              <p className="text-sm text-gray-400">
                {event.time}
              </p>

              <h3 className="font-semibold text-white">
                {event.title}
              </h3>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AttackTimeline;