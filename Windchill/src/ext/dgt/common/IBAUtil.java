package ext.dgt.common;

import wt.fc.PersistenceHelper;
import wt.iba.value.AbstractValue;
import wt.iba.value.DefaultAttributeContainer;
import wt.iba.value.IBAHolder;
import wt.iba.value.IBAHolderReference;
import wt.iba.value.StringValue;
import wt.iba.value.litevalue.AbstractValueView;
import wt.iba.value.litevalue.StringValueDefaultView;
import wt.iba.value.service.IBAValueHelper;

public class IBAUtil {
	// IBA 값 셋팅 , IBA == Grobal 속성
	public static void setIBAValueStr(Object obj, String ibaName, String ibaValue) {
		try {
			// wt.iba.value.IBAHolder
			IBAHolder ibaHolder = (IBAHolder) obj;

			//IBHolder의 속성 Container 새로고침
			ibaHolder = IBAValueHelper.service.refreshAttributeContainer(ibaHolder, null, null, null);

			// 객체의 iba 속성 container가져옴
			DefaultAttributeContainer ibaContainer = (DefaultAttributeContainer) ibaHolder.getAttributeContainer();

			// 객체의 속성을 배열에 저장
			AbstractValueView[] abstractValueView = ibaContainer.getAttributeValues();
			
			for (int i = 0; i < abstractValueView.length; i++) {
				AbstractValue abstractValue = (AbstractValue) PersistenceHelper.manager.refresh(abstractValueView[i].getObjectID());

				if (abstractValueView[i].getDefinition().getName().equals(ibaName)) {
					// 속성의 타입이 String이면 iba속성값, classNameKeyA4 셋팅
					if (abstractValueView[i] instanceof StringValueDefaultView) {
						System.out.println("viewDefinitnio:::::::::::::>"+abstractValueView[i].getDefinition().getName());
						// iba 속성값 셋팅
						((StringValue) abstractValue).setValue(ibaValue);

						// classNameKeyA4 셋팅
						((StringValue) abstractValue).setIBAHolderReference(IBAHolderReference.newIBAHolderReference(ibaHolder));
					}
					PersistenceHelper.manager.save(abstractValue);
					break;
				}
				// iba 속성 저장
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// IBA속성 value 조회
	public static String getIBAValueStr(Object obj, String ibaName) throws Exception {
		// iba 속성 value 저장 변수
		String value = "";

		try {
			IBAHolder ibaHolder = (IBAHolder) obj;
			ibaHolder = IBAValueHelper.service.refreshAttributeContainer(ibaHolder, null, null, null);

			// 해당 객체의 속성 컨테이너 가져옴
			DefaultAttributeContainer defaultAttributeContainer = (DefaultAttributeContainer) ibaHolder
					.getAttributeContainer();

			if (defaultAttributeContainer != null) {
				AbstractValueView[] abstractValueView = defaultAttributeContainer.getAttributeValues();

				for (int i = 0; i < abstractValueView.length; i++) {
					if (abstractValueView[i].getDefinition().getName().equals(ibaName)) {
						if (abstractValueView[i] instanceof StringValueDefaultView) {
							value = ((StringValueDefaultView) abstractValueView[i]).getValue();
						}
					}
				}

			}

		} catch (Exception e) {
			throw e;
		}

		return value;

	}
}
