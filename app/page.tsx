import Image from "next/image";
import Router from "next/router";
import PickUp from "@/app/components/orders/pickUp";
import Served from "@/app/components/orders/served";
import { prisma } from "@/lib/database/orders";

const refresh: boolean = false;

export default async function Home() {

  const readyOrders = await prisma.order.findMany({
    take: 10,
    where: {
      timestamp: {
        lte: new Date(Date.now()),
        gte: new Date(Date.now() - 1000 * 2 * 60)
      }
    },
    orderBy: {
      timestamp: 'desc'
    }
  })

  const pastOrders = await prisma.order.findMany({
    take: 10,
    where: {
      timestamp: {
        lte: new Date(Date.now() - 1000 * 2 * 60), // Show orders from before the last 2 minutes
        gte: new Date(Date.now() - 1000 * 10 * 60) // Show the first 10 orders until 10 minutes ago
      }
    },
    orderBy: {
      timestamp: 'desc'
    }
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16">
      <meta http-equiv="refresh" content="10" ></meta>
      <div className="w-full flex">
        <div className="w-5/12">
          <PickUp data={readyOrders ? readyOrders : []} />
        </div>
        <div className="w-2/12">
          <div className="mx-auto w-52">
            <Image src="/logo.png" width={200} height={200} alt="logo" />
          </div>
        </div>
        <div className="w-5/12">
          <Served data={pastOrders ? pastOrders : []} />
        </div>
      </div>
    </main>
  );
}