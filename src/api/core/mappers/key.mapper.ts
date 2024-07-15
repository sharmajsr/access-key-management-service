/* eslint-disable max-lines-per-function */
import { Injectable } from '@nestjs/common';
import { KeyRetriveResponse } from 'src/connectors/models';
import { KeyCreateRequest } from 'src/connectors/models/key-creation.request';

import { KeyCreationDto } from '../dtos';
import { KeyResponseDto } from '../dtos/key.response.dto';

@Injectable()
export class KeyMapper {
  mapToKeyCreationModel(
    keyCreationDto: KeyCreationDto,
  ): KeyCreateRequest {
    return {
      Id : keyCreationDto.id,
      keyVal: keyCreationDto.keyVal,
      RateLimit : keyCreationDto.rateLimit,
      ExpirationTime : keyCreationDto.expirationTime
    };
  }

  mapToKeyRetrieveModel(keyResponse: KeyResponseDto): KeyRetriveResponse {
    return {

      KeyVal : keyResponse.keyVal,
      ExpirationTime : keyResponse.expirationTime,
      Id:keyResponse.id,
      RateLimit:keyResponse.rateLimit,

      Status: keyResponse.status
    };
  }

  // mapToSalesforceModificationModel(
  //   caseModificationDto: CaseModificationDto,
  // ): CaseModificationRequest {
  //   return {
  //     ContactId: caseModificationDto.contactId,
  //     Origin: caseModificationDto.origin,
  //     Subject: caseModificationDto.subject,
  //     Description: caseModificationDto.description,
  //     LinkedOpportunity__c: caseModificationDto.opportunityId,
  //     SuppliedEmail: caseModificationDto.webEmail,
  //     WebName: caseModificationDto.webName,
  //     Status: caseModificationDto.status,
  //     Priority: caseModificationDto.priority,
  //     CurrencyIsoCode: caseModificationDto.currency,
  //     POC_Credits_Requested__c: caseModificationDto.pocCreditsRequested,
  //     To_Be_Raised_for_POC_Credits__c:
  //       caseModificationDto.toBeRaisedforPocCredits,
  //     POC_Start_Date__c: caseModificationDto.pocStartDate,
  //     POC_End_Date__c: caseModificationDto.pocEndDate,
  //     Project_Success_Criteria__c: caseModificationDto.projectSuccessCriteria,
  //     AWS_Services__c: caseModificationDto.awsServices,
  //     Technical_Description__c: caseModificationDto.technicalDescription,
  //     AWS_Calculator_link__c: caseModificationDto.awsCalculatorlink,
  //     Requester__c: caseModificationDto.requesterEmail,
  //     Action__c: caseModificationDto.action,
  //     Market__c: caseModificationDto.market,
  //     Vertical__c: caseModificationDto.vertical,
  //     Reuest_Status__c: caseModificationDto.requestStatus,
  //     Content_Type__c: caseModificationDto.contentType,
  //     If_Other__c: caseModificationDto.ifOther,
  //     Description__c: caseModificationDto.otherDescription,
  //     amgChannelName__c: caseModificationDto.channelId,
  //     amgChannelLanguage__c: caseModificationDto.channelLanguage,
  //     amgAdsPlusContentType__c: caseModificationDto.adsPlusChannelcontentType,
  //     amgAdPlacementtype__c: caseModificationDto.adPlacementType,
  //     amgVideoMetadataSupported__c: caseModificationDto.videoMetadataSupported,
  //     amgOtherSupportedVideoMetadata__c:
  //       caseModificationDto.otherSupportedVideoMetadata,
  //     amgGEO__c: caseModificationDto.geo,
  //     amgAvgMonthlyVolumesByGEO__c: caseModificationDto.avgMonthlyVolumesByGeo,
  //     amgAvgContentLength__c: caseModificationDto.avgContentLength,
  //     amgIstheContentProfessionallyProduced__c:
  //       caseModificationDto.istheContentProfessionallyProduced,
  //     amgWillCustomerProvideLicensingRights__c:
  //       caseModificationDto.willCustomerProvideLicensingRights,
  //     amgIstheContentInstream__c: caseModificationDto.istheContentInstream,
  //     amgContentIncludesSensitiveCategories__c:
  //       caseModificationDto.contentIncludesSensitiveCategories,
  //     amgContentAdhereToIABsInitiatives__c:
  //       caseModificationDto.contentAdhereToIabsInitiatives,
  //     ContentListedInPremCTVMarketplace__c:
  //       caseModificationDto.contentListedInPremCtvMarketplace,
  //     amgContentAppIsListedIn__c: caseModificationDto.contentAppIsListedIn,
  //     amgOtherCTVMarketplace__c: caseModificationDto.otherCtvMarketplace,
  //     amgEligibilityState__c: caseModificationDto.eligibilityState,
  //     amgEligibilityStateReason__c: caseModificationDto.eligibilityStateReason,
  //     amgRequestType__c: caseModificationDto.requestType,
  //     amgRequestInitiatedBy__c: caseModificationDto.requestInitiatedBy,
  //     InformedCustomerandPlatform__c:
  //       caseModificationDto.informedCustomerandPlatform,
  //     amgChannels__c: caseModificationDto.channel,
  //     amgFreshDeskAMGID__c: caseModificationDto.freshDeskAmagiId,
  //     amgFreshDeskCustomerName__c: caseModificationDto.freshDeskCustomerName,
  //     amgFreshDeskTicket__c: caseModificationDto.freshDeskTicket,
  //     Type: caseModificationDto.type,
  //     amgPlatforms__c: caseModificationDto.platforms,
  //     amgServices__c: caseModificationDto.services,
  //     Effective_Date_of_Termination__c: caseModificationDto.churnEffectiveDate,
  //     amgBillingStopDate__c: caseModificationDto.billingStopDate,
  //     amgAdditionalCommentsFD__c: caseModificationDto.additionalComment,
  //     amgOthersFD__c: caseModificationDto.other,
  //     amgSubmitterEmail__c: caseModificationDto.submitterEmail,
  //     amgSubmitterName__c: caseModificationDto.submitterName,
  //     amgWhatNeedsToBeChurned__c: caseModificationDto.customerProvidedChurnReason,      
  //   };
  // }
}
