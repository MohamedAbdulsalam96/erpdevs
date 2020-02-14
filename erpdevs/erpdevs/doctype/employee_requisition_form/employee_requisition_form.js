// Copyright (c) 2020, One FM and contributors
// For license information, please see license.txt

frappe.ui.form.on('Employee Requisition Form', {
	refresh: function(frm){
		if(frm.doc.workflow_state === "Approved"){
			frm.add_custom_button(__("Complete Operational Requirments"), function(){
				var doc = frappe.model.get_new_doc("ERF Operational Requirements");
				doc.erf_reference = frm.doc.name;
				frappe.route_options = frm.doc;
				frappe.set_route("Form", doc.doctype, doc.name);
				
			}).addClass("btn-primary");
		}

		if(frm.doc.male){
			cur_frm.toggle_enable("no_of_male_employees", true);
			cur_frm.toggle_enable("height_by_male", true);
			cur_frm.toggle_reqd("no_of_male_employees", 1);
		}else{
			frm.set_value("no_of_male_employees", "");
			cur_frm.toggle_enable("no_of_male_employees", false);
			cur_frm.toggle_enable("height_by_male", false);
			cur_frm.toggle_reqd("no_of_male_employees", 0);
			frm.set_value("height_by_male", "");
		}

		if(frm.doc.female){
			cur_frm.toggle_enable("no_of_female_employees", true);
			cur_frm.toggle_enable("height_by_female", true);
			cur_frm.toggle_reqd("no_of_female_employees", 1);
		}else{
			frm.set_value("no_of_female_employees", "");
			frm.set_value("height_by_female", "");
			cur_frm.toggle_reqd("no_of_female_employees", 0);
			cur_frm.toggle_enable("no_of_female_employees", false);
			cur_frm.toggle_enable("height_by_female", false);
		}
	},

	male: function(frm) {
		if(frm.doc.male){
			console.log("here");
			cur_frm.toggle_enable("no_of_male_employees", true);
			cur_frm.toggle_reqd("no_of_male_employees", 1);
			cur_frm.toggle_enable("height_by_male", true);
		}else{
			frm.set_value("no_of_male_employees", "");
			frm.set_value("height_by_male", "");
			cur_frm.toggle_reqd("no_of_male_employees", 0);
			cur_frm.toggle_enable("no_of_male_employees", false);
			cur_frm.toggle_enable("height_by_male", false);
		}
	},

	female: function(frm){
		if(frm.doc.female){
			cur_frm.toggle_enable("no_of_female_employees", true);
			cur_frm.toggle_enable("height_by_female", true);
			cur_frm.toggle_reqd("no_of_female_employees", 1);
		}else{
			frm.set_value("no_of_female_employees", "");
			frm.set_value("height_by_female", "");
			cur_frm.toggle_reqd("no_of_female_employees", 0);
			cur_frm.toggle_enable("no_of_female_employees", false);
			cur_frm.toggle_enable("height_by_female", false);
		}
	},

	setup: function(frm){
		frm.set_query('project', function(doc) {
			return {
				query:"erpdevs.erpdevs.doctype.employee_requisition_form.employee_requisition_form.get_project",
				filters: {
					"doctype": "project"
				}
			}
		})
	},
	before_save: function(frm){
		console.log(frm.doc.male, frm.doc.female);
		let total_reqd_employees = 0;

		if(frm.doc.male === 1 && frm.doc.female === 1){
			console.log(frm.doc.male, frm.doc.female);
			total_reqd_employees = cint(frm.doc.no_of_male_employees) + cint(frm.doc.no_of_female_employees);
		}
		else if(frm.doc.male === 1 && frm.doc.female === 0){
			total_reqd_employees = cint(frm.doc.no_of_male_employees);
		}
		else if(frm.doc.male === 0 && frm.doc.female === 1){
			total_reqd_employees = cint(frm.doc.no_of_female_employees);
		}
		else if(frm.doc.male === 0 && frm.doc.female === 0){
			total_reqd_employees = cint(frm.doc.no_of_employees);
		}
		console.log(total_reqd_employees);
		frappe.model.set_value("Employee Requistion Form", frm.doc.name ,"total_employees", total_reqd_employees);
	},

});
