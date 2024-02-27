import React from 'react'
import { prisma } from '@/lib/database/orders'

export default async function Form() {
    const addOrder = async (formData: FormData) => {
        'use server'

        const ordernumber = formData.get('ordernummer')
        prisma.order.create({
            data: {
                orderNumber: ordernumber as string
            }
        })
    }

    return (
        <div>
            <form action={addOrder}>
                <div>
                    <input className='bg-gray-200 text-black shadow-inner rounded-l p-2 flex-1' id='ordernummer' name='ordernummer' type='number' aria-label='Ordernummer' placeholder='2024' />
                    <button className='bg-green-950 hover:bg-green-600 duration-300 text-white shadow p-2 rounded-r' type='submit' aria-disabled={pending}>
                        Omroepen
                    </button>
                </div>
            </form>
        </div>
    )
}


