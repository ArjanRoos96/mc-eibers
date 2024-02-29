import React from 'react'
import { prisma } from '@/lib/database/orders'
import { revalidatePath } from 'next/cache'

export default async function Kitchen() {

    const pastOrders = await prisma.order.findMany({
        take: 10,
        orderBy: {
            timestamp: 'desc'
        }
    })

    const addOrder = async (formData: FormData) => {
        'use server'
        
        const ordernumber = formData.get('ordernummer')
        await prisma.order.create({
            data: {
                orderNumber: ordernumber as string
            }
        })

        // Reload the pages
        revalidatePath('/keuken')
        revalidatePath('/')
    }

    const deleteOrder = async (formData: FormData) => {
        'use server'
        const orderId = Number(formData.get('id'))
        await prisma.order.delete({
            where: {
                id: orderId,
            }
        })
        revalidatePath('/keuken')
        revalidatePath('/')
    }

    return (
        <div className="w-full min-h-screen p-16">
            <form id='input-form' action={addOrder}>
                <div>
                    <input className='bg-gray-200 text-black shadow-inner rounded-l w-full p-4 flex-1 mb-2' id='ordernummer' name='ordernummer' type='number' aria-label='Ordernummer' placeholder='2024' required />
                    <button className='bg-green-950 hover:bg-green-600 duration-300 text-white shadow p-4 w-full rounded-r' type='submit'>
                        Omroepen
                    </button>
                </div>
            </form>
            <div className="w-full lg:p-14 mt-24">
                <h1 className="text-2xl text-center bg-green-950 p-6 mb-8 rounded-3xl font-semibold">Recent Orders</h1>
                { pastOrders.map((order: any) => {
                    return (
                        <div key={`order-` + order.id} className="w-full flex mx-auto mb-4 bg-green-950 rounded-3xl">
                            <div className="w-2/3">
                                <h2 className="text-3xl text-slate-300 text-center rounded-3xl py-4">{order.orderNumber}</h2>
                            </div>
                            <div className="w-1/3 flex">
                                <form key={`order-form-` + order.id} action={deleteOrder}>
                                    <input id="id" type="hidden" name="id" value={order.id} />
                                    <button className="bg-red-950 hover:bg-red-600 duration-300 text-white shadow p-3 mt-3 rounded-3xl" type="submit">
                                        X
                                    </button>
                                </form>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
