import React from 'react'
import { prisma } from '@/lib/database/orders'
import { revalidatePath } from 'next/cache'

export default async function Kitchen() {
    const pastOrders = await prisma.order.findMany({
        take: 10
    })

    const addOrder = async (formData: FormData) => {
        'use server'
        console.log('add an order')
        const ordernumber = formData.get('ordernummer')
        await prisma.order.create({
            data: {
                orderNumber: ordernumber as string
            }
        })
        revalidatePath('/keuken')
        revalidatePath('/')
    }

    const deleteOrder = async (formData: FormData) => {
        'use server'
        console.log('delete an order')
        const orderId = formData.get('id') as unknown
        console.log('delete order: ' + orderId)
        await prisma.order.delete({
            where: {
                id: orderId as number,
            }
        })
        revalidatePath('/keuken')
        revalidatePath('/')
    }

    return (
        <div className="w-full min-h-screen p-16">
            <form action={addOrder}>
                <div>
                    <input className='bg-gray-200 text-black shadow-inner rounded-l p-2 flex-1' id='ordernummer' name='ordernummer' type='number' aria-label='Ordernummer' placeholder='2024' required />
                    <button className='bg-green-950 hover:bg-green-600 duration-300 text-white shadow p-2 rounded-r' type='submit'>
                        Omroepen
                    </button>
                </div>
            </form>
            <div className="w-full p-14">
                { pastOrders.map((order: any) => {
                    return (
                        <div key={`order-` + order.id} className="w-full flex mx-auto mb-4 bg-green-950 rounded-3xl">
                            <div className="w-2/3">
                                <h2 className="text-3xl text-slate-300 text-center rounded-3xl py-4">{order.orderNumber}</h2>
                            </div>
                            <div className="w-1/3 flex">
                                <form key={`order-form-` + order.id} action={deleteOrder}>
                                    <input id="id" type="hidden" name="id" value={order.id} />
                                    <button className="mx-auto" type="button">
                                        <h2 className="text-red-600 text-center text-3xl py-4">X</h2>
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
