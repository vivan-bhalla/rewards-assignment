package com.test.reward.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.test.reward.modal.CustomerReward;
import com.test.reward.modal.Reward;

@Service
public class RewardService {

	private static final int DISCOUNT_RATE = 50;
	private static final int MAX = 100;
	Map<String, CustomerReward> customerRewards = new HashMap<>();

	public CustomerReward getCustomerRewardByName(String customerName) {
		return customerRewards.get(customerName);
	}

	public List<CustomerReward> rewardCalculator(Reward rewards) {
		List<CustomerReward> result = new ArrayList<>();
		String custName = rewards.getCustomerName();
		int amt = rewards.getAmount();
		int reward = calculateRewardPoint(amt);
		int month = Integer.parseInt(rewards.getDate().split("-")[1]);
		if (customerRewards.containsKey(custName)) {
			customerRewards.get(custName).addReward(month, reward);
		} else {
			CustomerReward customerReward = new CustomerReward(custName);
			customerReward.addReward(month, reward);
			customerRewards.put(custName, customerReward);
		}
		for (Map.Entry<String, CustomerReward> c : customerRewards.entrySet()) {
			result.add(c.getValue());
		}

		return result;

	}

	private static int calculateRewardPoint(int txnAmount) {
		if (txnAmount <= DISCOUNT_RATE) {
			return 0;
		}
		if (txnAmount <= MAX) {
			return txnAmount - DISCOUNT_RATE;
		}
		return (txnAmount - MAX) * 2 + DISCOUNT_RATE;
	}

}
