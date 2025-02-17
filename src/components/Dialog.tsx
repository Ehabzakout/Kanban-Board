import { Dialog } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import { openDialog } from "../interfaces";

const DialogDemo = ({
  children,
  open,
  setOpen,
  triggerCompenet,
  title,
}: openDialog) => (
  <Dialog.Root open={open} onOpenChange={setOpen}>
    <Dialog.Trigger asChild>{triggerCompenet}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
      <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[400px] -translate-x-1/2 -translate-y-1/2 overflow-scroll rounded-md bg-gray1 p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow dark:bg-mauve11 dark:text-lines-light">
        <Dialog.Title className="m-0 text-[17px] font-medium text-mauve12 dark:text-lines-light">
          {title}
        </Dialog.Title>
        <Dialog.Description className="mb-3 mt-2.5 text-[10px] leading-normal text-mauve9 dark:text-lines-light">
          Make changes to your profile here. Click save when you're done.
        </Dialog.Description>
        {children}

        <Dialog.Close asChild>
          <button
            className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full bg-gray3 text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
            aria-label="Close"
          >
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DialogDemo;
