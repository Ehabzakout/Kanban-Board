import { DropdownMenu } from "radix-ui";
import { item } from "../interfaces";
import { ReactNode } from "react";

const DropdownMenuDemo = ({
  triggerComponent,
  items,
}: {
  triggerComponent: ReactNode;
  items: item[];
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {triggerComponent && triggerComponent}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] dark:bg-mauve11"
          sideOffset={5}
        >
          {items &&
            items.map((item) => (
              <DropdownMenu.Item
                key={item.lable}
                className={`${item.class} group relative flex h-[25px] cursor-pointer select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[11px] leading-none outline-none hover:bg-violet3 data-[disabled]:pointer-events-none data-[disabled]:text-mauve8 dark:hover:bg-mauve9`}
                onClick={item.onClick}
              >
                {item.lable}
              </DropdownMenu.Item>
            ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownMenuDemo;
