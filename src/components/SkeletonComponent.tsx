import { Card, Grid, Skeleton } from "@mantine/core"

export default function SkeletonComponent() {
    return (<Card
        display={'flex'}
        w={'50rem'}
        h={'auto'}
        radius="lg"
        p="md"
    >
        <Grid
            p={'md'}
            w={"100%"}>
            <Grid.Col offset={1} span={'auto'}>
                <Skeleton height={50} circle mb="xl" />
                <Skeleton height={8} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
            </Grid.Col>
        </Grid>
    </Card>)
}