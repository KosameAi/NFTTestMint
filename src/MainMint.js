import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import { Container, Button, Flex, Input, Text, Image, Link } from '@chakra-ui/react';
import TestNFT from './TestNFT.json';
import Opensea from "./assets/social-media-icons/opensea_32x32.png";
import Twitter from "./assets/social-media-icons/twitter_32x32.png";
import Discord from "./assets/social-media-icons/discord_32x32.png";
import Gif from "./assets/PixelAi.gif";

const TestNFTAddress = "0x274855865F2D16c2b8Be9da7BF44E783e67B611A";

const MainMint = ({ accounts, setAccounts}) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.etherum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                TestNFTAddress,
                TestNFT.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount));
                console.log("response: ", response);
            } catch (err) {
                console.log("error: ", err)
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount -1);
    };

    const handleIncrement = () => {
        if (mintAmount >= 2) return;
        setMintAmount(mintAmount +1);
    };

    return (
        <Flex justify="center" align="center" height="35vh" paddingBottom= "150px" >
            <Container width="520px" height="20vh" centerContent>
                <div>
                    <Text 
                    fontSize="48px" 
                    textShadow="0 5px #000000"
                    align="center"
                    >
                       TestNFT
                    </Text>

                    <Image
                    boxSize='210px'
                    border="5px"
                    borderColor="black"
                    objectFit='cover'
                    src={Gif}
                    alt='Pixel Ai Gif'
                    
                    />

                    <Text
                    fontSize="30px"
                    letterSpacing="-5.5%"
                    fontFamily="VT323"
                    textShadow="0 2px 2px #000000"
                    >
                    This is a test mint and site on the Rinkeby test network.
                    </Text>
                </div>

                    {isConnected ? (
                        <div>
                            <Flex align="center" justify="center" >

                            <Button 
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="10px"
                                onClick = {handleDecrement} >
                                    -
                            </Button>

                                <Input 
                                readOnly 
                                fontFamily="inherit"
                                width= "100px"
                                height= "40px"
                                textAlign="center"
                                paddingLeft="19px"
                                marginTop="10px"
                                type="number"
                                value = {mintAmount} />

                                <Button 
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="10px" 
                                onClick = {handleIncrement} >
                                    +
                                </Button>

                            </Flex>
                            <Button 
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="10px"
                                onClick={handleMint} >
                                    Mint Now
                            </Button>
                                        </div>
                    ) : (
                        <Text
                        marginTop="70px"
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 3px #000000"
                        color="#D6517D"
                        > 
                        You must be connected to mint.
                        </Text>
                    )}


                <Flex justify="space-around" height="5vh" width="40%" padding= "75px">
                    <Link href="https://www.opensea.com">
                        <Image src = {Opensea} boxSize="42px" margin = "0 15px"/>
                    </Link>
                    <Link href="https://www.twitter.com">
                        <Image src = {Twitter} boxSize="42px" margin = "0 15px"/>
                    </Link>
                    <Link href="https://www.discord.gg">
                        <Image src = {Discord} boxSize="42px" margin = "0 15px"/>
                    </Link>
                </Flex> 
            </Container>
            
        </Flex>
    );
};

export default MainMint;