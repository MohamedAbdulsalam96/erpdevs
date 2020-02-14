# -*- coding: utf-8 -*-
# Copyright (c) 2020, One FM and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class ERFOperationalRequirements(Document):
	pass

@frappe.whitelist()
def get_designation_data(designation):
    try:
        skills = frappe.db.sql("""select skill from `tabDesignation Skill` where parent = %s """, designation, as_dict = True)
        profile = frappe.db.sql(""" select objective_type, objective, objective_definition, days from `tabPerformance Profile` where parent = %s """, designation, as_dict = True)
        return skills, profile
    except Exception as e:
        frappe.msgprint(e)
