// import axios from 'axios';
import Auth from '../components/auth/auth';
import GraphQLClient from './GraphQLConfig';
import { gql } from '@apollo/client';

var user = Auth.getAuth()
var userId = user?.id

const OrderGraphQL = {

    subscribeToActiveOrder: () => {
      const activeOrder = gql`
        subscription activeOrder {
          orders(where: {current: {_eq: true}, paid: {_eq: false}}) {
            id
            status
            total
            taxFee: tax_fee
            stripeFee: stripe_fee
            serviceFee: service_fee
            prepStartTime: prep_start_time
            prepEndTime: prep_end_time
            pickedUpAt: picked_up_at
            uuid
            updatedAt: updated_at
            paidAt: paid_at
            paid
            lineitemsTotal: lineitems_total
            dropOffDistance: drop_off_distance
            deliveryMethod: delivery_method
            deliveryFee: delivery_fee
            deliveredAt: delivered_at
            delivered
            deliverStartTime: deliver_start_time
            deletedAt: deleted_at
            deleted
            current
            createdAt: created_at
            payment {
              id
              paid
              paymentMethodId: payment_method_id
              paymentMethodBrand: payment_method_brand
              paymentMethodLast4: payment_method_last4
              paymentMethodType: payment_method_type
              type
              updatedAt: updated_at
              uuid
              description
              deletedAt: deleted_at
              deleted
              createdAt: created_at
              amountPaid: amount_paid
            }
            lineItems: line_items {
              id
              uuid
              updatedAt: updated_at
              total
              deleted
              createdAt: created_at
              count
              product {
                id
                uuid
                type
                title
                rating
                price
                description
                calories
                createdAt: created_at
                deleted
                imageUrl: image_url
                updatedAt: updated_at
              }
            }
          }
        }
      `;

      return GraphQLClient.subscribe({
        query: activeOrder, 
        variables: {
        }
      });
    },
    subscribeToActiveTrades: () => {

      const SUB_ACTIVE_TRADES = gql`
        subscription subscribeToActiveTrades($userId : bigint!) {
          trades(where: {active: {_eq: true}, user_id: {_eq: $userId}}) {
            id
            uuid
            user_id
            numberOfContracts: number_of_contracts
            numberOfShares: number_of_shares
            buyOrderType: buy_order_type
            sellOrderType: sell_order_type
            profit
            purchasedAt: purchased_at
            purchasedTotalPrice: purchased_total_price
            sharePurchasedPrice: share_purchased_price
            sellLimitPrice: sell_limit_price
            status
            stopLossLimitPrice: stop_loss_limit_price
            stopLossPrice: stop_loss_price
            sellLimitPricesSetCount: sell_limit_prices_set_count
            ticker
            active
            assetType: asset_type
            buyLimitPrice: buy_limit_price
            direction
            legsSymbol: legs_symbol
            cancellation_reason
            cancelledAt: cancelled_at
            currentProfit: current_profit
            numberOfContractsSold: number_of_contracts_sold
            numberOfSharesSold: number_of_shares_sold
            optionSoldPrice: option_sold_price
            optionPurchasedPrice: option_purchased_price
            optionStrikePrice: option_strike_price
            rating
            shareSoldPrice: share_sold_price
            soldAt: sold_at
            soldTotalPrice: sold_total_price
            soldType: sold_type
            createdAt: created_at
            updatedAt: updated_at
            tradeStationProfit: trade_station_profit
            tsPosition: trade_to_ts_position {
              data: position_data
            }
            tsOrder: trade_to_ts_buy_order {
              data: order_data
            }
            tsSellLimitOrder: trade_to_ts_sell_limit_order {
              data: order_data
            }
            tsStopLossOrder: trade_to_ts_stop_loss_order {
              data: order_data
            }
          }
        }
      `;

      return GraphQLClient.subscribe({
        query: SUB_ACTIVE_TRADES, 
        variables: {
          userId: userId
        }
      });
    },
    getHistoricalTrades: () => {

      const GET_HISTORICAL_TRADES = gql`
        query getHistorialTrades($userId: bigint!) {
          trades(where: {active: {_eq: false}, user_id: {_eq: $userId}, deleted: {_eq: false}}, order_by: {id: desc}) {
            id
            uuid
            userId: user_id
            numberOfContracts: number_of_contracts
            numberOfShares: number_of_shares
            buyOrderType: buy_order_type
            sellOrderType: sell_order_type
            profit
            purchasedAt: purchased_at
            purchasedTotalPrice: purchased_total_price
            sharePurchasedPrice: share_purchased_price
            sellLimitPrice: sell_limit_price
            sellLimitPricesSetCount: sell_limit_prices_set_count
            status
            stopLossLimitPrice: stop_loss_limit_price
            stopLossPrice: stop_loss_price
            ticker
            active
            assetType: asset_type
            buyLimitPrice: buy_limit_price
            direction
            legsSymbol: legs_symbol
            cancellation_reason
            cancelledAt: cancelled_at
            currentProfit: current_profit
            numberOfContractsSold: number_of_contracts_sold
            numberOfSharesSold: number_of_shares_sold
            optionSoldPrice: option_sold_price
            optionPurchasedPrice: option_purchased_price
            optionStrikePrice: option_strike_price
            rating
            shareSoldPrice: share_sold_price
            soldAt: sold_at
            soldTotalPrice: sold_total_price
            soldType: sold_type
            createdAt: created_at
            updatedAt: updated_at
            tradeStationProfit: trade_station_profit
            tsPosition: trade_to_ts_position {
              data: position_data
            }
            tsOrder: trade_to_ts_buy_order {
              data: order_data
            }
            tsSellLimitOrder: trade_to_ts_sell_limit_order {
              data: order_data
            }
            tsStopLossOrder: trade_to_ts_stop_loss_order {
              data: order_data
            }
          }
        }
      `;


      return GraphQLClient
      .query({
        query: GET_HISTORICAL_TRADES,
        variables: {
          userId: userId
        },
        fetchPolicy: "no-cache"
      });
    },
    getHistoricalTradesByTicker: (ticker, assetType) => {

      const GET_HISTORICAL_TRADES = gql`
        query getHistorialTrades($userId: bigint!, $ticker: String!, $assetType: String!) {
          trades(where: {active: {_eq: false}, user_id: {_eq: $userId}, asset_type: {_eq: $assetType}, deleted: {_eq: false}, ticker: {_eq: $ticker}}, order_by: {id: desc}) {
            id
            uuid
            userId: user_id
            numberOfContracts: number_of_contracts
            numberOfShares: number_of_shares
            buyOrderType: buy_order_type
            sellOrderType: sell_order_type
            profit
            purchasedAt: purchased_at
            purchasedTotalPrice: purchased_total_price
            sharePurchasedPrice: share_purchased_price
            status
            stopLossLimitPrice: stop_loss_limit_price
            stopLossPrice: stop_loss_price
            buyLimitPrice: buy_limit_price
            sellLimitPrice: sell_limit_price
            sellLimitPricesSetCount: sell_limit_prices_set_count
            ticker
            active
            assetType: asset_type
            direction
            legsSymbol: legs_symbol
            cancellation_reason
            cancelledAt: cancelled_at
            currentProfit: current_profit
            numberOfContractsSold: number_of_contracts_sold
            numberOfSharesSold: number_of_shares_sold
            optionSoldPrice: option_sold_price
            optionPurchasedPrice: option_purchased_price
            optionStrikePrice: option_strike_price
            rating
            shareSoldPrice: share_sold_price
            soldAt: sold_at
            soldTotalPrice: sold_total_price
            soldType: sold_type
            createdAt: created_at
            updatedAt: updated_at
            tradeStationProfit: trade_station_profit
            tsPosition: trade_to_ts_position {
              data: position_data
            }
            tsOrder: trade_to_ts_buy_order {
              data: order_data
            }
            tsSellLimitOrder: trade_to_ts_sell_limit_order {
              data: order_data
            }
            tsStopLossOrder: trade_to_ts_stop_loss_order {
              data: order_data
            }
          }
        }
      `;


      return GraphQLClient
      .query({
        query: GET_HISTORICAL_TRADES,
        variables: {
          userId: userId,
          ticker: ticker,
          assetType: assetType
        },
        fetchPolicy: "no-cache"
      });
    },
    getTradeByUuid: (uuid) => {

      const GET_BY_UUID= gql`
        query getTradeByUuid($uuid: String!) {
          trades(where: {active: {_eq: false}, uuid: {_eq: $uuid}, deleted: {_eq: false}}) {
            id
            uuid
            userId: user_id
            numberOfContracts: number_of_contracts
            numberOfShares: number_of_shares
            buyOrderType: buy_order_type
            sellOrderType: sell_order_type
            profit
            purchasedAt: purchased_at
            purchasedTotalPrice: purchased_total_price
            sharePurchasedPrice: share_purchased_price
            sellLimitPrice: sell_limit_price
            sellLimitPricesSetCount: sell_limit_prices_set_count
            status
            stopLossLimitPrice: stop_loss_limit_price
            stopLossPrice: stop_loss_price
            ticker
            active
            assetType: asset_type
            buyLimitPrice: buy_limit_price
            direction
            legsSymbol: legs_symbol
            cancellation_reason
            cancelledAt: cancelled_at
            currentProfit: current_profit
            numberOfContractsSold: number_of_contracts_sold
            numberOfSharesSold: number_of_shares_sold
            optionSoldPrice: option_sold_price
            optionPurchasedPrice: option_purchased_price
            optionStrikePrice: option_strike_price
            rating
            shareSoldPrice: share_sold_price
            soldAt: sold_at
            soldTotalPrice: sold_total_price
            soldType: sold_type
            createdAt: created_at
            updatedAt: updated_at
            tradeStationProfit: trade_station_profit
            tsPosition: trade_to_ts_position {
              data: position_data
            }
            tsOrder: trade_to_ts_buy_order {
              data: order_data
            }
            tsSellLimitOrder: trade_to_ts_sell_limit_order {
              data: order_data
            }
            tsStopLossOrder: trade_to_ts_stop_loss_order {
              data: order_data
            }
            notes {
              id
              content
              createdAt: created_at
              user {
                firstName: first_name
                lastName: last_name
              }
            }
          }
        }
      `;


      return GraphQLClient
      .query({
        query: GET_BY_UUID,
        variables: {
          uuid: uuid
        },
        fetchPolicy: "no-cache"
      });
    },
   
}

export default OrderGraphQL;