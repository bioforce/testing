<template>
    <div class="container mx-auto">
        <draggable
            v-model="taskList"
            @start="dragging = true"
            @end="dragging = false"
            class="max-w-sm mx-auto py-6 items-center sm:px-6 lg:px-8"
            @change="sorting">
            <div v-for="task in taskList" :key="task.id" class="relative cursor-move max-w-sm rounded overflow-hidden shadow-lg item mb-2">
                <div class="absolute top-0 right-0" @click="deleteTask(task)">
                    <button aria-label="Close panel" class="text-gray-300 hover:text-white transition ease-in-out duration-150">
                        <!-- Heroicon name: x -->
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">{{task.name}}</div>
                    <p class="text-gray-700 text-base">
                    {{task.description}}
                    </p>
                </div>
            </div>
        </draggable>
        <div class="max-w-sm mx-auto py-6 items-center sm:px-6 lg:px-8" v-if="!isShowForm">
        <button
            class="bg-blue-500 mx-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-3"
            @click="showForm"
            >
            Add
        </button>
        </div>
        <div class="max-w-sm mx-auto py-6 items-center sm:px-6 lg:px-8" v-if="isShowForm">
            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                    Title
                </label>
                </div>
                <div class="md:w-2/3">
                    <input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        id="inline-full-name"
                        type="text"
                        required
                        v-model="form.name">
                </div>
            </div>
            <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                    Description
                </label>
                </div>
                <div class="md:w-2/3">
                    <textarea
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        id="inline-password"
                        v-model="form.description">
                    </textarea>
                </div>
            </div>
            <div class="md:flex md:items-center">
                <div class="md:w-1/3"><a href="javascript:void(0)" @click="closeForm">Cancel</a></div>
                <div class="md:w-2/3">
                <button @click="add" class="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                    Confirm
                </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
    name: 'List',
    components: {
        draggable,
    },
    mounted: function () {
        this.getTaskList()
    },
    data() {
        return {
            isShowForm: false,
            taskList: [],
            form: {
                name: '',
                description: '',
            },
        }
    },
    methods: {
        deleteTask(task)
        {
            axios.delete('/api/task/'+task.id)
                .then((response) => {
                    if (response.data)
                    {
                        this.taskList = response.data
                    }
                })
        },
        getTaskList()
        {
            axios.get('/api/task')
                .then((response) => {
                    if (response.data)
                    {
                        this.taskList = response.data
                    }
                })
        },
        sorting() {
            axios.post('/api/task/sorting', this.taskList)
                .then((response) => {
                    if (response.data)
                    {
                        this.taskList = response.data
                        this.closeForm()
                    }
                })
        },
        showForm() {
            this.isShowForm = true
        },
        closeForm() {
            this.isShowForm = false
            this.form = {
                name: '',
                description: '',
            }
        },
        add()
        {
            axios.post('/api/task', this.form)
                .then((response) => {
                    if (response.data)
                    {
                        this.taskList = response.data
                        this.closeForm()
                    }
                })
        }
    },
}
</script>
