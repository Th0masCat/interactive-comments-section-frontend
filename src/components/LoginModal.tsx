import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button, PasswordInput, TextInput, Flex } from '@mantine/core';

export default function Demo() {
    const [opened, { open, close }] = useDisclosure(true);

    return (
        <>
            <Modal opened={opened} onClose={close} centered withCloseButton={false}>
                <Flex direction='column' p={'lg'}>
                    <TextInput 
                    label="Your email" 
                    radius={'lg'} 
                    withAsterisk/>
                    <PasswordInput
                        label="Password"
                        radius="lg"
                        withAsterisk
                    />
                </Flex>
            </Modal>
        </>
    );
}