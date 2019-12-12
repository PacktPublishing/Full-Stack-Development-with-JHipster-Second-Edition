<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="jhvueApp.employee.home.createOrEditLabel" v-text="$t('jhvueApp.employee.home.createOrEditLabel')">Create or edit a Employee</h2>
                <div>
                    <div class="form-group" v-if="employee.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="employee.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhvueApp.employee.name')" for="employee-name">Name</label>
                        <input type="text" class="form-control" name="name" id="employee-name"
                            :class="{'valid': !$v.employee.name.$invalid, 'invalid': $v.employee.name.$invalid }" v-model="$v.employee.name.$model"  required/>
                        <div v-if="$v.employee.name.$anyDirty && $v.employee.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.employee.name.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhvueApp.employee.age')" for="employee-age">Age</label>
                        <input type="number" class="form-control" name="age" id="employee-age"
                            :class="{'valid': !$v.employee.age.$invalid, 'invalid': $v.employee.age.$invalid }" v-model.number="$v.employee.age.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhvueApp.employee.dob')" for="employee-dob">Dob</label>
                        <div class="d-flex">
                            <input id="employee-dob" type="datetime-local" class="form-control" name="dob" :class="{'valid': !$v.employee.dob.$invalid, 'invalid': $v.employee.dob.$invalid }"
                            
                            :value="convertDateTimeFromServer($v.employee.dob.$model)"
                            @change="updateInstantField('dob', $event)"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-bind:value="$t('jhvueApp.employee.user')" for="employee-user">User</label>
                        <select class="form-control" id="employee-user" name="user" v-model="employee.user">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="employee.user && userOption.id === employee.user.id ? employee.user : userOption" v-for="userOption in users" :key="userOption.id">{{userOption.login}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.employee.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./employee-update.component.ts">
</script>
