import React from 'react'

const PickUp = ({data}: any) => {
    return (
        <div>
            <h1 className="text-5xl text-white font-bold bg-green-950 rounded-3xl p-6 w-3/4">Ready for pickup!</h1>
            <div className="w-full pt-16">
                { data.map((order: any) => {
                    return (
                        <div key={`order-` + order.id} className="w-1/2 mb-8">
                            <h2 className="text-9xl text-yellow-300 text-center bg-green-950 rounded-3xl py-6">{order.orderNumber}</h2>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PickUp
