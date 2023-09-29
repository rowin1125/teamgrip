import { Alert, AlertProps, Flex, Icon } from '@chakra-ui/react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BsCheckCircle, BsExclamationTriangle } from 'react-icons/bs';
import { RiInformationLine } from 'react-icons/ri';

type TextAlertProps = {
    children: React.ReactNode;
} & AlertProps;

const TextAlert = ({ children, status, ...props }: TextAlertProps) => {
    let AlertIcon;

    switch (status) {
        case 'success':
            AlertIcon = BsCheckCircle;
            break;
        case 'info':
            AlertIcon = RiInformationLine;
            break;
        case 'error':
            AlertIcon = AiOutlineCloseCircle;
            break;
        case 'warning':
            AlertIcon = BsExclamationTriangle;
            break;

        default:
            break;
    }
    return (
        <Alert borderRadius="xl" status={status} {...props}>
            <Flex>
                <Icon as={AlertIcon} fontSize="xl" mr={4} />
                <Flex flexDir="column" fontWeight="bold">
                    {children}
                </Flex>
            </Flex>
        </Alert>
    );
};

export default TextAlert;
