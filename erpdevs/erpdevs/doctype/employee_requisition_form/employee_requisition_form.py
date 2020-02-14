# -*- coding: utf-8 -*-
# Copyright (c) 2020, One FM and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.utils import nowdate, getdate, random_string


class EmployeeRequisitionForm(Document):
    def on_submit(self):
        year = nowdate().split('-')[0][-2:]
        company_code = frappe.get_value(
            "Company",  {"name": self.company}, "abbr")
        request_number = self.name[-3:]
        designation_code = self.designation_code

        erf_code = company_code+designation_code+request_number+"-"+year
        self.erf_code = erf_code
        self.erf_initiation_date = getdate()


def get_project(doctype, txt, searchfield, start, page_len, filters):
    return frappe.db.sql("""select project_full_name, status from `tabProject` where status = "Open" """)


@frappe.whitelist()
def make_operational_requirements(frm):
    pass
