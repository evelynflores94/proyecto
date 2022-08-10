import React, { useState, useEffect } from "react"
import FuseSvgIcon from "@fuse/core/FuseSvgIcon"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

const CompanyPlan = () => {
  const [valueStart, setValueStart] = useState(null)
  const [valueEnd, setValueEnd] = useState(null)

  return (
    <div className="flex flex-col max-w-full p-24 pt-32 sm:pt-40 sm:p-32 w-full">
      <div className="flex sm:space-x-24 mb-16">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "40ch" }
          }}
        >
          <FuseSvgIcon className="hidden sm:inline-flex mt-16" color="action">
            heroicons-outline:pencil-alt
          </FuseSvgIcon>

          <TextField
            id="title"
            label="Plan"
            className="flex-auto"
            variant="outlined"
            autoFocus
            required
            fullWidth
          />

          <div>
            <FuseSvgIcon className="hidden sm:inline-flex mt-16" color="action">
              heroicons-outline:calendar
            </FuseSvgIcon>

            <DatePicker
              label="Inicio"
              value={valueStart}
              size="medium"
              onChange={(newValue) => {
                setValueStart(newValue)
              }}
              renderInput={(params) => <TextField {...params} />}
            />

            <FuseSvgIcon className="hidden sm:inline-flex mt-16" color="action">
              heroicons-outline:calendar
            </FuseSvgIcon>

            <DatePicker
              label="Fin"
              value={valueEnd}
              onChange={(newValue) => {
                setValueEnd(newValue)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>

          <FuseSvgIcon className="hidden sm:inline-flex mt-16" color="action">
            heroicons-outline:pencil-alt
          </FuseSvgIcon>

          <TextField
            id="observation"
            label="Observacion"
            className="flex-auto"
            variant="outlined"
            autoFocus
            required
            fullWidth
          />
        </Box>
      </div>
    </div>
  )
}

export default CompanyPlan
