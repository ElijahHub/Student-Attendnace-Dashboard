"use client";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
} from "@heroui/react";

export default function DeleteDialog({
  title = "Delete Confirmation",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  isOpen,
  onOpenChange,
  onDelete,
}: {
  title?: string;
  description?: string;
  onDelete(): void;
  isOpen: boolean;
  onOpenChange: any;
}) {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {title && (
                  <div className="px-4 pt-4 pb-1 text-lg font-semibold">
                    {title}
                  </div>
                )}
              </ModalHeader>
              <ModalBody>
                <p>{description}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  variant="flat"
                  onPress={() => onClose()}
                >
                  Close
                </Button>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => onDelete()}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
