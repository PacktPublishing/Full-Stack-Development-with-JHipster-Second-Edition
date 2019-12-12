<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="employee">
                <h2 class="jh-entity-heading"><span v-text="$t('jhvueApp.employee.detail.title')">Employee</span> {{employee.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('jhvueApp.employee.name')">Name</span>
                    </dt>
                    <dd>
                        <span>{{employee.name}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhvueApp.employee.age')">Age</span>
                    </dt>
                    <dd>
                        <span>{{employee.age}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhvueApp.employee.dob')">Dob</span>
                    </dt>
                    <dd>
                        <span v-if="employee.dob">{{$d(Date.parse(employee.dob), 'long') }}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhvueApp.employee.user')">User</span>
                    </dt>
                    <dd>
                        {{employee.user ? employee.user.login : ''}}
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="employee.id" :to="{name: 'EmployeeEdit', params: {employeeId: employee.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./employee-details.component.ts">
</script>
