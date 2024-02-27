import { PrismaClient } from '@prisma/client'

export const prisma =  new PrismaClient()

export async function create(orderNumber: any) {
    const order = await prisma.order.create({
        data: {
            orderNumber: orderNumber
        }
    })
    console.log(order)
}