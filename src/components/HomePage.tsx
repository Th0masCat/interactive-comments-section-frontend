import { AppShell, Flex } from "@mantine/core";
import CommentBoxComponent from "./CommentBoxComponent";
import ReplyBoxComponent from "./ReplyBoxComponent";
import axios from 'axios'
import { useEffect, useState } from "react";

import avatar from '../../images/avatars/image-amyrobson.png'

export default function HomePage() {
  const [image, setImage] = useState();
  const [comments, setComments] = useState([]);
  const endpoint = 'http://127.0.0.1:8000'

  useEffect(() => {
    axios.get(endpoint + '/api/toka/').then(res => {
      console.log(res.data[0])
      setComments(res.data)
    })
  }, [])

  return (
    <AppShell
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Flex direction="column" align="center" gap={'md'}>
        <CommentBoxComponent
          img={avatar}
          like={3}
          time = '2023-04-22T06:23:14.333479Z'
          name='amyrobson'
          content='Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Ad sapiente tempora quae voluptates impedit id maiores suscipit. 
                    Consequuntur cupiditate voluptate enim! Quasi, veniam voluptas? Temporibus, perspiciatis. 
                    Tempora adipisci voluptatem ipsam.' />

        {comments.map((comment: any) => {
          return (
            <CommentBoxComponent
              id = {comment.id}
              key={comment.id}
              img={endpoint + comment.user_details.user_image}
              like={comment.likes}
              name={comment.user_details.name}
              time={comment.time_when_posted}
              content={comment.post_content} />
          )
        })
        }
        <ReplyBoxComponent />
      </Flex>
    </AppShell>
  );
}
