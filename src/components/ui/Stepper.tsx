import { Fragment } from "react";

export function Stepper({
  steps,
  active,
}: {
  steps: string[];
  active: number;
}) {
  return (
    <div className="flex flex-row gap-3 items-center justify-between w-full">
      {steps.map((step, index) => (
        <Fragment key={index}>
          <div
            className={`min-w-10 h-10 rounded-full flex items-center justify-center ${
              index < active ? "bg-primary text-white" : "bg-gray-400"
            }`}
          >
            <span className={`text-xs ${index < active ? "font-bold" : ""}`}>
              {step}
            </span>
          </div>

          {index < steps.length - 1 && (
            <div
              className={`w-full h-2 rounded ${
                index + 1 < active ? "bg-primary" : "bg-gray-400"
              }`}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}
