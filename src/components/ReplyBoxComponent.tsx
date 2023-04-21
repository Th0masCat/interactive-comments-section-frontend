import { Card, Flex, Text, Image, Button, Grid, Textarea } from '@mantine/core'
import avatar from '../../images/avatars/image-amyrobson.png'
import replyIcon from '../../images/icon-reply.svg'

export default function ReplyBoxComponent() {
    return (
        <Card w={'45rem'} h={'auto'} radius="lg" >
            <Flex p={'sm'} gap="sm" justify={'space-between'}>
            <Image width={'2rem'} src={avatar} alt="Amy Robson" />
            <Textarea size='sm' autosize radius={'md'} w={'100%'} minRows={3}>
            </Textarea>
            <Button size='sm' styles={(theme) => ({
                root: {
                    backgroundColor: theme.colors.sitePrimary[0],
                    color: theme.colors.siteNeutral[4],
                    '&:hover': {
                        backgroundColor: theme.colors.siteNeutral[3],
                        color: theme.colors.sitePrimary[0],
                    }
                }
            })

            }>Reply</Button>

            </Flex>
        </Card>
    );
}