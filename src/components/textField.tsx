import { clsx } from "clsx";

export default function TextField({
  placeholder,
  isInvalid,
  name,
  required,
  defaultValue,
}: {
  placeholder?: string | undefined;
  isInvalid?: boolean;
  name?: string | undefined;
  required?: boolean;
  defaultValue?: string | undefined;
}) {
  return (
    <>
      <div className="flex flex-1 items-center">
        {isInvalid && (
          <span className="absolute right-4 text-body-l text-red">
            Can't be Empty
          </span>
        )}
        <input
          type="text"
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required}
          className={clsx(
            "h-6 w-full rounded-[4px] border border-medium-grey/25 py-2 pl-4 text-[9px] text-body-l text-black outline-2 outline-main-purple dark:bg-mauve7 dark:outline-mauve12",
            { "border-red pr-32": isInvalid, "pr-4": isInvalid },
          )}
        ></input>
      </div>
    </>
  );
}
