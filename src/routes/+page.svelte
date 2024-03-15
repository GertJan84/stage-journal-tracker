<script lang="ts">
    import Button from '../components/Button.svelte'    
    import { Surreal } from 'surrealdb.js';
    import { active } from '../store'

    $: current_difficould = 3

    const db: Surreal = new Surreal();
   
    (async () => {
        try {
            await db.connect("http://127.0.0.1:8000/rpc", {
                namespace: "journal" ,
                database: "journal",


                //auth: {
                //    username: "root",
                //    password: "root",
                //}
            })

        } catch (e) {
            console.log("Error", e)
        }

        let events: Array<Object> = await db.select("event")
        let event = events[0]


        if (event) {
           if (!("endDate" in event)) {
                $active = true
            }
        }

    })()


    const addEvent = async () => {
        return await db.create("event", {

            name: "test1",
            startDate: new Date().toLocaleString(),

            extended: 1,
            expectedMinute: 30,
            difficoultie: 2,
            comment: "This is a test"
        })
    }


    const submit_form = (e: Event) => {
        e.preventDefault()
    }

</script>

<main class="flex flex-col min-w-80 w-screen h-screen justify-center items-center">
    <div class="flex items-center flex-col">
        <h1 class="text-center">Log your progress during your stage</h1>
        <form class="flex flex-col min-w-80 p-3" on:submit={submit_form}>
            <label for="assignement">Assignement name</label>
            <input name="assignement" type="text" />

            <label for="time">Expected done minuts</label>
            <input name="time"type="text" inputmode="numeric" />

            <div class="flex flex-col">
                <label for="difficould">Expected difficould</label>
                <input name="difficould" type="range" min="1" max="10" bind:value={current_difficould}/>
                <span class="text-right">{current_difficould}</span>
            </div>

            <label for="comment">Extra commend</label>
            <textarea minlength="6" rows="10"></textarea>

            <div class="flex w-100 {$active ? "justify-between" : "justify-end"} mb-8">
                {#if active}
                    <Button text="Extend" />
                {/if}

                <Button text="Add photo" />
            </div>

            <div class="flex justify-center">
                <Button text={$active ? "Stop assignement" : "Start assignement" } />
            </div>
        </form>
    </div>
</main>

<style lang="postcss">
    h1 {
        color: #6494AA;
        font-size: 2rem;
    }

    input {
        min-height: 3rem;
        font-size: 1.6rem;
    }

    input[type="text"], textarea {
        border-radius: 3px; 
        background: #FEFFFE;
        border: none;
        outline: none;
        color: #363732;
        margin-bottom: 0.5rem;
    }

</style>
