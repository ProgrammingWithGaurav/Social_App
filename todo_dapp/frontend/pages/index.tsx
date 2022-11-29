import { ConnectWallet, useAddress, useContract, useContractMetadata, Web3Button } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const address = useAddress();
  const contractAddress = "0x90f07e0ffAa3eE5b38839D51685eE7700f9AAA5b";
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { contract } = useContract(contractAddress);
  const getData = async () => {
    const todos = await contract?.call("getTodo");
    setIsLoading(false);
    setData(todos);
  }

  getData();

  console.log(address)
  return (
    <div className="flex items-center justify-center w-full h-screen flex-col mx-auto">
    {address ? (
      <>
        <div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter todo"
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-[30px]"'
          />

          <Web3Button
            contractAddress={contractAddress}
            action={(contract) => contract.call("setTodo", input)}
            accentColor="#1ce"
            isDisabled={input.trim().length === 0}
          >
            Set Todo
          </Web3Button>
        </div>

        <div>
          {isLoading ? (
            "Loading..."
          ) : (
            <ul>
              {data?.map((item: string, index: number) => (
                <li key={index}>
                  {item}
                  <Web3Button
                    contractAddress={contractAddress}
                    action={(contract) => contract.call("deleteToDo", index)}
                    accentColor="#1ce"
                  >
                    Delete Todo
                  </Web3Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </>
    ) : (
      <ConnectWallet accentColor="#1ce" colorMode="light" />
    )}
  </div>
  );
};

export default Home;
