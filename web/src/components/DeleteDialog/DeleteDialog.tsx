import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonProps,
  Heading,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { BsTrash } from 'react-icons/bs';

type DeleteDialogType = {
  onDelete: (id: string) => Promise<void>;
  loading?: boolean;
  id: string;
  children: React.ReactNode;
  buttonVariant?: ButtonProps['variant'];
  title: string;
  buttonLabel?: string;
  buttonProps?: ButtonProps;
};

const DeleteDialog = ({
  onDelete,
  loading,
  id,
  children,
  buttonVariant = 'solid',
  title,
  buttonLabel,
  buttonProps,
}: DeleteDialogType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);

  const handleDelete = () => {
    onDelete(id);
    onClose();
  };

  return (
    <>
      <Button
        colorScheme="red"
        onClick={onOpen}
        variant={buttonVariant}
        {...buttonProps}
      >
        {buttonLabel && (
          <Text color="white" mr={4}>
            {buttonLabel}
          </Text>
        )}
        <Icon as={BsTrash} />
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <Heading>{title}</Heading>
            </AlertDialogHeader>

            <AlertDialogBody>{children}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDelete}
                ml={4}
                isLoading={loading}
              >
                Weg ermee
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteDialog;
