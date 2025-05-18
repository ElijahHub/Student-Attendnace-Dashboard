"use client";
import _ from "lodash";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
} from "@heroui/react";

export default function ViewDetails({
  title,
  data,
  isOpen,
  onOpenChange,
}: {
  title: string;
  data: any;
  isOpen: boolean;
  onOpenChange: any;
}) {
  const entries = _.toPairs(data);

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
                {entries.map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-sm font-medium text-default-500">
                      {_.startCase(key)}
                    </span>
                    <span className="text-sm text-default-900">
                      {_.isNil(value) ? (
                        <em className="text-default-400">N/A</em>
                      ) : _.isArray(value) ? (
                        <ul className="list-disc pl-4">
                          {value.length === 0 ? (
                            <li className="text-default-400">None</li>
                          ) : (
                            value.map((item, idx) => (
                              <li key={idx} className="text-default-900">
                                {_.isObject(item)
                                  ? JSON.stringify(item, null, 2)
                                  : String(item)}
                              </li>
                            ))
                          )}
                        </ul>
                      ) : (
                        String(value)
                      )}
                    </span>
                  </div>
                ))}
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={() => onClose()}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
