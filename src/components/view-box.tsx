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
  data: Record<string, any>;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const entries = _.toPairs(data ?? {});

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            {title && (
              <ModalHeader>
                <div className="px-4 pt-4 pb-1 text-lg font-semibold">
                  {title}
                </div>
              </ModalHeader>
            )}

            <ModalBody>
              {entries.length === 0 ? (
                <div className="text-sm text-default-500 italic">
                  No details available.
                </div>
              ) : (
                entries.map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between items-start gap-2 py-1"
                  >
                    <span className="text-sm font-medium text-default-500">
                      {_.startCase(key)}
                    </span>
                    <span className="text-sm text-default-900 text-right">
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
                                  ? JSON.stringify(item)
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
                ))
              )}
            </ModalBody>

            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
