import React, { FC, useEffect } from "react"
import { VStack, HStack, Box, Text, Grid, Button } from "@chakra-ui/react"
import { setBreadcrumbs } from "../../../infrastructure/state/Breadcrumbs"
import useNavigator from "../navigator"

interface Props {}

interface Section {
  index: string
  title: string
  description: string
  action: string
  onClick: () => void
}

const Top: FC<Props> = () => {
  const navigator = useNavigator()

  useEffect(() => {
    setBreadcrumbs([])
  }, [])

  const sections: Section[] = [
    {
      index: "01",
      title: "Reports",
      description: "View, export, and manage report outputs.",
      action: "Open Reports",
      onClick: () => navigator.toReports(),
    },
    {
      index: "02",
      title: "Templates",
      description: "Upload and organize reusable report templates.",
      action: "Open Templates",
      onClick: () => navigator.toTemplates(),
    },
    {
      index: "03",
      title: "Data Sources",
      description: "Configure the databases your reports connect to.",
      action: "Open Sources",
      onClick: () => navigator.toDataSources(),
    },
  ]

  return (
    <VStack gap="96px" align="stretch" w="100%">
      {/* Hero */}
      <Box pt="24px">
        <Text
          fontFamily="mono"
          fontSize="11px"
          letterSpacing="0.25em"
          textTransform="uppercase"
          color="nothing.textSecondary"
          mb="24px"
        >
          [OPENREPORT / WORKSPACE]
        </Text>
        <Text
          fontFamily="display"
          fontSize={{ base: "72px", md: "128px", lg: "160px" }}
          lineHeight="0.9"
          letterSpacing="-0.02em"
          color="nothing.text"
          mb="24px"
        >
          REPORTS.
        </Text>
        <HStack gap="32px" alignItems="flex-start" flexWrap="wrap">
          <Text
            fontFamily="body"
            fontSize="17px"
            color="nothing.textSecondary"
            maxW="520px"
            lineHeight="1.5"
          >
            Manage reports, templates, and data sources without the noise. A
            minimal surface, tuned for speed.
          </Text>
          <HStack gap="12px">
            <Button
              onClick={() => navigator.toReportNew()}
              h="44px"
              fontFamily="mono"
              fontSize="11px"
              letterSpacing="0.2em"
              textTransform="uppercase"
            >
              + New report
            </Button>
            <Button
              variant="outline"
              onClick={() => navigator.toTemplateNew()}
              h="44px"
              fontFamily="mono"
              fontSize="11px"
              letterSpacing="0.2em"
              textTransform="uppercase"
            >
              + New template
            </Button>
          </HStack>
        </HStack>
      </Box>

      {/* Index list */}
      <Box>
        <HStack
          borderTopWidth="1px"
          borderColor="nothing.text"
          pt="16px"
          pb="16px"
          justifyContent="space-between"
        >
          <Text
            fontFamily="mono"
            fontSize="10px"
            letterSpacing="0.25em"
            textTransform="uppercase"
            color="nothing.textSecondary"
          >
            Index
          </Text>
          <Text
            fontFamily="mono"
            fontSize="10px"
            letterSpacing="0.25em"
            textTransform="uppercase"
            color="nothing.textSecondary"
          >
            {sections.length.toString().padStart(2, "0")} sections
          </Text>
        </HStack>

        <VStack gap={0} align="stretch">
          {sections.map((s) => (
            <Grid
              key={s.index}
              templateColumns={{
                base: "1fr",
                md: "80px 1fr 1fr 180px",
              }}
              gap="24px"
              py="32px"
              borderBottomWidth="1px"
              borderColor="nothing.border"
              alignItems="center"
              cursor="pointer"
              onClick={s.onClick}
              transition="background 120ms ease-out"
              _hover={{ bg: "nothing.subtle" }}
              px="8px"
            >
              <Text
                fontFamily="mono"
                fontSize="12px"
                letterSpacing="0.15em"
                color="nothing.textDisabled"
              >
                {s.index}
              </Text>
              <Text
                fontFamily="heading"
                fontSize="40px"
                lineHeight="1"
                letterSpacing="-0.02em"
                fontWeight={500}
                color="nothing.text"
              >
                {s.title}
              </Text>
              <Text
                fontFamily="body"
                fontSize="14px"
                color="nothing.textSecondary"
                lineHeight="1.5"
              >
                {s.description}
              </Text>
              <Text
                fontFamily="mono"
                fontSize="11px"
                letterSpacing="0.2em"
                textTransform="uppercase"
                color="nothing.text"
                justifySelf={{ base: "start", md: "end" }}
              >
                {s.action} →
              </Text>
            </Grid>
          ))}
        </VStack>
      </Box>
    </VStack>
  )
}

export default Top
