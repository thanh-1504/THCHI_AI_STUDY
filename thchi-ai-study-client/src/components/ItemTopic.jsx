const ItemTopic = () => {
    return (
        < div className="bg-(image:--my-topic-green-gradient) rounded-2xl p-3 mb-2 cursor-pointer transition-all duration-200 hover:bg-(image:--my-topic-green-hover-gradient) shadow-topic-green active:shadow-none active:translate-y-[8px]" >
            <div className="flex items-center gap-x-3">
                <div className="border-2 border-yellow-400 rounded-full p-[2px]">
                    <img className="w-23 h-23 rounded-full object-cover" src="https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybHxlbnwwfHwwfHx8MA%3D%3D" alt="avatar" />
                </div>
                <div>
                    <h3 className="text-white font-bold text-2xl">Schools</h3>
                    <span className="text-white">1.Trường học</span>
                </div>
            </div>
        </div >
    )
}
export default ItemTopic