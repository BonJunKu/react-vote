import { Grid, Progress } from '@nextui-org/react';
import * as React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Title } from '../../@shared/components/styeld';
import useUser from '../../@shared/hooks/useUser';

function Result() {
  const { getUser } = useUser();
  const [candidates, setCandidates] = React.useState([]);

  React.useEffect(() => {
    getUser()
      .voteService.fetchCandidates()
      .then((data) => {
        setCandidates(data);
      });
  }, [setCandidates]);

  const maximumVote = Math.max(
    ...candidates.map((element: any) => {
      return element.votes;
    })
  );
  return (
    <Container>
      <Title>๐๊ฒฐ๊ณผ ํ์ธ๐</Title>
      <InnerContainer>
        <Grid.Container xs={12} sm={6} gap={2}>
          {candidates &&
            candidates.map((element: any, index: number) => {
              return (
                <ResultElement key={index}>
                  {/* ์ธ๋ฑ์ค๋ฅผ ์ฃผ๋ฉด ์๋๋๋ฐ... 
                  response์ id๊ฐ์ด ์์ด์..
                  ์์์ฉ์๋๋ค */}
                  <Name>
                    {JSON.stringify(element.name).replace(/\"/gim, '')}
                  </Name>
                  <VoteCount>
                    {parseInt(JSON.stringify(element.votes))}
                  </VoteCount>
                  <Grid style={{ width: '100%' }}>
                    <Progress
                      value={
                        (parseInt(JSON.stringify(element.votes)) /
                          maximumVote) *
                        100
                      }
                    />
                  </Grid>
                </ResultElement>
              );
            })}
        </Grid.Container>
      </InnerContainer>
    </Container>
  );
}
const InnerContainer = styled.div`
  position: relative;
  left: 4vmin;
  top: 2vmin;
`;
const Name = styled.div`
  width: 25%;
  text-align: cemter;
`;
const VoteCount = styled.div``;

const ResultElement = styled.div`
  width: 50vmin;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default Result;
