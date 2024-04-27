<template>
    <aside :class="`${sidebar_expanded && 'sidebar-expanded'}`">
        <div class="d-flex">
            <button class="toggle-btn" type="button" @click="$router.push('/')">
                <i><font-awesome-icon icon="fa-solid fa-house-user" /></i>
                <span>Helicoper</span>
            </button>
        </div>
        <div class="menu-toggle-wrap">
            <button class="menu-toggle" >
                <span class="material-icons">
                    PIN
                </span>
            </button>
        </div>
        <div class="menu">
            <router-link class="button" to="/">
                <span class="material-icons">home</span>
                <!-- <span class="text">Home</span> -->
            </router-link>
            <router-link class="button" to="/student">
                <span class="material-icons">visibility</span>
                <!-- <span class="text">About</span> -->
            </router-link>
            <router-link class="button" to="/">
                <span class="material-icons">group</span>
                <!-- <span class="text">Team</span> -->
            </router-link>
            <router-link class="button" to="/login">
                <span class="material-icons">email</span>
                <!-- <span class="text">Contact</span> -->
            </router-link>
        </div>
        <div class="flex"></div>
        <div class="menu">
            <router-link class="button" to="/" @click="toggleMenu">
                <span class="material-icons">settings</span>
                <!-- <span class="text">Settings</span> -->
            </router-link>
        </div>
    </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name:"Navbar",
    components:{
        
    },

    data(){
        return{
            sidebar_expanded:localStorage.getItem('sidebar_expanded') === "true" as String
        }
    },

    methods:{
        toggleMenu(){
            this.sidebar_expanded = !this.sidebar_expanded
            localStorage.setItem('sidebar_expanded', String(this.sidebar_expanded))
        }
    }

})
</script>

<style lang="scss" scoped>
@import "./Navbar.scss";
</style>

