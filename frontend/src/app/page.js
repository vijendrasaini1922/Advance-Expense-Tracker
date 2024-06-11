import Image from "next/image";
import Expense from "./components/ExpenseExtract";
import ExpenseForm from "./components/ExpenseForm";
import dynamic from 'next/dynamic';
import 'chart.js/auto';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between h-max-[100vh] px-16 pt-4">
      <div className="z-10 max-w-4/5 w-full items-center justify-between font-mono text-sm flex-row">
        <div>
          <h2 className="fixed left-0 top-0 flex w-full mb-2 justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            Expense Tracker
          </h2>
        </div>
        <div className="overflow-y-auto w-full">
          <Expense />
        </div>
      </div>
    </main>
  );
}
